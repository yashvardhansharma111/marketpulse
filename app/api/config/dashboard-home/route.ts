import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 300;

type MarketQuote = {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePct: number;
  tvSymbol: string;
  delayed?: boolean;
  currency?: string;
  marketTime?: number | null;
};

type MutualFundQuote = {
  schemeCode: number | null;
  name: string;
  nav: number;
  change: number;
  changePct: number;
  asOf: string | null;
  fundHouse?: string;
  category?: string;
};

type HomeConfig = {
  indices: MarketQuote[];
  stocks: Array<{
    symbol: string;
    name: string;
    ltp: number;
    change: number;
    changePct: number;
    tvSymbol?: string;
    delayed?: boolean;
  }>;
  commodities: MarketQuote[];
  mutualFunds: MutualFundQuote[];
  updatedAt: string;
};

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "application/json,text/plain,*/*",
};

const INDEX_DEFS = [
  { label: "NIFTY", symbol: "^NSEI", tvSymbol: "NSE:NIFTY" },
  { label: "NIFTY 50", symbol: "^NSEI", tvSymbol: "NSE:NIFTY" },
  { label: "SENSEX", symbol: "^BSESN", tvSymbol: "BSE:SENSEX" },
];

const STOCK_DEFS = [
  { label: "Reliance", symbol: "RELIANCE.NS", tvSymbol: "NSE:RELIANCE" },
  { label: "HDFC Bank", symbol: "HDFCBANK.NS", tvSymbol: "NSE:HDFCBANK" },
  { label: "TCS", symbol: "TCS.NS", tvSymbol: "NSE:TCS" },
  { label: "Infosys", symbol: "INFY.NS", tvSymbol: "NSE:INFY" },
];

const COMMODITY_DEFS = [
  { label: "Gold", symbol: "GC=F", tvSymbol: "COMEX:GC1!" },
  { label: "Silver", symbol: "SI=F", tvSymbol: "COMEX:SI1!" },
  { label: "Crude Oil", symbol: "CL=F", tvSymbol: "NYMEX:CL1!" },
  { label: "Natural Gas", symbol: "NG=F", tvSymbol: "NYMEX:NG1!" },
];

const MUTUAL_FUND_QUERIES = [
  "Parag Parikh Flexi Cap Fund Direct Growth",
  "HDFC Top 100 Fund Direct Plan Growth",
  "SBI Small Cap Fund Direct Plan Growth",
  "Axis Bluechip Fund Direct Plan Growth",
];

const fallbackConfig: HomeConfig = {
  indices: [
    {
      name: "NIFTY",
      symbol: "^NSEI",
      value: 22410.3,
      change: 146.2,
      changePct: 0.66,
      tvSymbol: "NSE:NIFTY",
      delayed: true,
    },
    {
      name: "NIFTY 50",
      symbol: "^NSEI",
      value: 22410.3,
      change: 146.2,
      changePct: 0.66,
      tvSymbol: "NSE:NIFTY",
      delayed: true,
    },
    {
      name: "SENSEX",
      symbol: "^BSESN",
      value: 73982.8,
      change: 412.5,
      changePct: 0.56,
      tvSymbol: "BSE:SENSEX",
      delayed: true,
    },
  ],
  stocks: [
    {
      symbol: "RELIANCE.NS",
      name: "Reliance",
      ltp: 2850,
      change: 25,
      changePct: 0.88,
      tvSymbol: "NSE:RELIANCE",
      delayed: true,
    },
    {
      symbol: "HDFCBANK.NS",
      name: "HDFC Bank",
      ltp: 1540,
      change: 6,
      changePct: 0.39,
      tvSymbol: "NSE:HDFCBANK",
      delayed: true,
    },
    {
      symbol: "TCS.NS",
      name: "TCS",
      ltp: 3920,
      change: -18,
      changePct: -0.46,
      tvSymbol: "NSE:TCS",
      delayed: true,
    },
    {
      symbol: "INFY.NS",
      name: "Infosys",
      ltp: 1610,
      change: 14,
      changePct: 0.88,
      tvSymbol: "NSE:INFY",
      delayed: true,
    },
  ],
  commodities: [
    {
      name: "Gold",
      symbol: "GC=F",
      value: 2168.4,
      change: 11.3,
      changePct: 0.52,
      tvSymbol: "COMEX:GC1!",
      delayed: true,
      currency: "USD",
    },
    {
      name: "Silver",
      symbol: "SI=F",
      value: 24.5,
      change: -0.14,
      changePct: -0.57,
      tvSymbol: "COMEX:SI1!",
      delayed: true,
      currency: "USD",
    },
    {
      name: "Crude Oil",
      symbol: "CL=F",
      value: 81.2,
      change: 0.92,
      changePct: 1.15,
      tvSymbol: "NYMEX:CL1!",
      delayed: true,
      currency: "USD",
    },
    {
      name: "Natural Gas",
      symbol: "NG=F",
      value: 2.14,
      change: -0.06,
      changePct: -2.73,
      tvSymbol: "NYMEX:NG1!",
      delayed: true,
      currency: "USD",
    },
  ],
  mutualFunds: [
    {
      schemeCode: null,
      name: "Parag Parikh Flexi Cap Fund Direct Growth",
      nav: 90.43,
      change: 0.66,
      changePct: 0.73,
      asOf: null,
      fundHouse: "PPFAS Mutual Fund",
      category: "Flexi Cap",
    },
    {
      schemeCode: 125497,
      name: "HDFC Top 100 Fund Direct Plan Growth",
      nav: 892.46,
      change: 2.54,
      changePct: 0.28,
      asOf: null,
      fundHouse: "HDFC Mutual Fund",
      category: "Large Cap",
    },
  ],
  updatedAt: new Date().toISOString(),
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: REQUEST_HEADERS,
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return (await response.json()) as T;
}

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
        symbol?: string;
        currency?: string;
        exchangeName?: string;
        regularMarketTime?: number;
      };
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>;
        }>;
      };
    }>;
  };
};

async function fetchYahooQuote(def: {
  label: string;
  symbol: string;
  tvSymbol: string;
}): Promise<MarketQuote> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(def.symbol)}?range=5d&interval=1d`;
  const data = await fetchJson<YahooChartResponse>(url);
  const result = data.chart?.result?.[0];
  const meta = result?.meta || {};
  const closes = (result?.indicators?.quote?.[0]?.close || []).filter(
    (value): value is number => typeof value === "number",
  );

  const current = Number(meta.regularMarketPrice ?? closes.at(-1) ?? 0);
  const previous = Number(meta.previousClose ?? meta.chartPreviousClose ?? closes.at(-2) ?? current);
  const change = current - previous;
  const changePct = previous ? (change / previous) * 100 : 0;

  return {
    name: def.label,
    symbol: def.symbol,
    value: current,
    change,
    changePct,
    tvSymbol: def.tvSymbol,
    delayed: true,
    currency: meta.currency,
    marketTime: meta.regularMarketTime ?? null,
  };
}

type MfSearchResponse = Array<{
  schemeCode: number;
  schemeName: string;
}>;

type MfHistoryResponse = {
  meta?: {
    scheme_code?: number;
    scheme_name?: string;
    fund_house?: string;
    scheme_category?: string;
  };
  data?: Array<{
    date?: string;
    nav?: string;
  }>;
};

async function fetchMutualFund(query: string): Promise<MutualFundQuote> {
  const searchUrl = `https://api.mfapi.in/mf/search?q=${encodeURIComponent(query)}`;
  const search = await fetchJson<MfSearchResponse>(searchUrl);
  const first = search[0];

  if (!first) {
    throw new Error(`No mutual fund match for ${query}`);
  }

  const historyUrl = `https://api.mfapi.in/mf/${first.schemeCode}`;
  const history = await fetchJson<MfHistoryResponse>(historyUrl);
  const latest = history.data?.[0];
  const previous = history.data?.[1];
  const nav = Number(latest?.nav ?? 0);
  const prevNav = Number(previous?.nav ?? nav);
  const change = nav - prevNav;
  const changePct = prevNav ? (change / prevNav) * 100 : 0;

  return {
    schemeCode: history.meta?.scheme_code ?? first.schemeCode,
    name: history.meta?.scheme_name || first.schemeName,
    nav,
    change,
    changePct,
    asOf: latest?.date ?? null,
    fundHouse: history.meta?.fund_house,
    category: history.meta?.scheme_category,
  };
}

async function settleQuotes(
  defs: Array<{ label: string; symbol: string; tvSymbol: string }>,
  fallback: MarketQuote[],
) {
  const settled = await Promise.allSettled(defs.map(fetchYahooQuote));
  return settled.map((result, index) =>
    result.status === "fulfilled" ? result.value : fallback[index],
  );
}

export async function GET() {
  try {
    const [indices, stocksRaw, commodities, mutualFundsSettled] = await Promise.all([
      settleQuotes(INDEX_DEFS, fallbackConfig.indices),
      settleQuotes(STOCK_DEFS, fallbackConfig.stocks.map((stock) => ({
        name: stock.name,
        symbol: stock.symbol,
        value: stock.ltp,
        change: stock.change,
        changePct: stock.changePct,
        tvSymbol: stock.tvSymbol || `NSE:${stock.symbol}`,
        delayed: stock.delayed,
      }))),
      settleQuotes(COMMODITY_DEFS, fallbackConfig.commodities),
      Promise.allSettled(MUTUAL_FUND_QUERIES.map(fetchMutualFund)),
    ]);

    const liveStocks = stocksRaw
      .map((quote, index) => ({
        symbol: STOCK_DEFS[index].symbol,
        name: quote.name,
        ltp: quote.value,
        change: quote.change,
        changePct: quote.changePct,
        tvSymbol: quote.tvSymbol,
        delayed: quote.delayed,
      }))
      .sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct));

    const mutualFunds = mutualFundsSettled
      .map((result, index) =>
        result.status === "fulfilled"
          ? result.value
          : fallbackConfig.mutualFunds[index] || null,
      )
      .filter((item): item is MutualFundQuote => Boolean(item));

    return NextResponse.json({
      config: {
        indices,
        stocks: liveStocks,
        commodities,
        mutualFunds,
        updatedAt: new Date().toISOString(),
      } satisfies HomeConfig,
    });
  } catch (error) {
    console.error("Config dashboard home error:", error);
    return NextResponse.json({ config: fallbackConfig });
  }
}
