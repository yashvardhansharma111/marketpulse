import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 text-slate-900">
      <header className="border-b border-sky-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white font-semibold">
              AE
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight">
                Ajmeraexchange
              </span>
              <span className="text-xs text-slate-500">Stock trading platform</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-sky-200 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50 md:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              Simple, fast and secure trading
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Trade with confidence on{" "}
              <span className="text-sky-600">Ajmeraexchange</span>.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Track markets, manage orders, add funds, and monitor P/L in one
              place. Built for speed and clarity—so you can focus on your
              decisions.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50"
              >
                Create Account
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-500">
              <div className="space-y-1">
                <p className="font-semibold text-slate-700">Quick onboarding</p>
                <p>Register, get verified, and start using the platform.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-slate-700">Clear reporting</p>
                <p>Profit &amp; loss, ledger, and transaction history.</p>
              </div>
            </div>
          </div>

          {/* Right column: fake market card */}
          <div className="rounded-3xl border border-sky-100 bg-white/80 p-5 shadow-sm shadow-sky-100 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-sky-500">
                  Ajmeraexchange
                </p>
                <p className="text-sm text-slate-500">Market Snapshot</p>
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                LIVE
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-500">Index</p>
                  <p className="text-2xl font-semibold text-slate-900">
                    AJX 50
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-emerald-500">
                    +1.24%
                  </p>
                  <p className="text-xs text-emerald-500">
                    ▲ 182.4 pts today
                  </p>
                </div>
              </div>

              <div className="mt-3 h-24 rounded-2xl bg-gradient-to-r from-sky-100 via-sky-50 to-emerald-50">
                <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,#bae6fd_1px,transparent_0)] bg-[length:16px_16px]" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
                <div className="space-y-1 rounded-2xl bg-sky-50 px-3 py-2">
                  <p className="text-slate-500">Volume</p>
                  <p className="text-sm font-semibold text-slate-900">
                    12.4M
                  </p>
                </div>
                <div className="space-y-1 rounded-2xl bg-sky-50 px-3 py-2">
                  <p className="text-slate-500">Day Range</p>
                  <p className="text-sm font-semibold text-slate-900">
                    18,420 – 18,960
                  </p>
                </div>
                <div className="space-y-1 rounded-2xl bg-sky-50 px-3 py-2">
                  <p className="text-slate-500">Dummy Trades</p>
                  <p className="text-sm font-semibold text-slate-900">
                    3.2k
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-500">Top movers</p>
                <ul className="space-y-1 rounded-2xl border border-sky-50 bg-sky-50/60 p-3">
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      AJMERA TECH
                    </span>
                    <span className="text-emerald-500">+4.8%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      AE INFRASTRUCTURE
                    </span>
                    <span className="text-emerald-500">+3.1%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      AJMERA BANK
                    </span>
                    <span className="text-rose-500">-1.2%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-sky-100 pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            FAQs
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Answers to common questions about onboarding, funds, and order
            tracking.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                How do I get my login password?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                After registration, your account is verified by admin. Once
                approved, the admin shares your password.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                How do I add funds to my account?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Go to the Funds tab, scan the QR code, and submit the payment
                reference with the amount you paid.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Where can I check Profit &amp; Loss?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Open the Orders tab to see day P/L, total P/L and order-wise
                P/L details.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Why does my data look different from real markets?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Values shown in the app are configured by the admin panel for
                your account and may differ from external sources.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Disclaimer Section */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Group Companies Members of BSE, NSE, MCX, MSEIL, CDSL
            </h2>
            <p className="text-sm text-slate-700">
              Broking Services, Depository Services
            </p>
          </div>

          {/* Registration Details */}
          <div className="space-y-2 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-slate-600">
              <span className="font-semibold">BSE Clearing No.:</span> 911 | <span className="font-semibold">NSE Clearing No.:</span> 11858 | <span className="font-semibold">MCX Clearing No.:</span> 10665 | <span className="font-semibold">MSEIL Clearing No.:</span> 11400
            </p>
            <p className="text-xs font-medium text-slate-600">
              <span className="font-semibold">CDSL DP ID:</span> 30300 | <span className="font-semibold">SEBI Regn. No.:</span> IN-DP-715-2022
            </p>
            <p className="text-xs font-medium text-slate-600">
              <span className="font-semibold">SEBI Reg No.:</span> INZ000177531 (Cash/F&O/CDs/MCX)
            </p>
          </div>

          {/* Attention Investors */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Attention Investors
            </h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-700">1.</span>
                <p className="text-xs text-slate-700">
                  Stock Brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f. September 1, 2020.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-700">2.</span>
                <p className="text-xs text-slate-700">
                  Update your mobile number & email Id with your stock broker/depository participant and receive OTP directly from depository on your email id and/or mobile number to create pledge.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-700">3.</span>
                <p className="text-xs text-slate-700">
                  Pay 20% upfront margin of the transaction value to trade in cash market segment.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-700">4.</span>
                <p className="text-xs text-slate-700">
                  Investors may please refer to the Exchange's Frequently Asked Questions (FAQs) issued vide circular reference NSE/INSP/45191 dated July 31, 2020 and NSE/INSP/45534 and BSE vide notice no. 20200731-7 dated July 31, 2020 and 20200831-45 dated August 31, 2020 and other guidelines issued from time to time in this regard.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-700">5.</span>
                <p className="text-xs text-slate-700">
                  Check your Securities /MF/ Bonds in the conso account statement issued by NSDL/CDSL every month.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-700">6.</span>
                <p className="text-xs text-slate-700">
                  <span className="font-semibold">5x Margin To FNO/ INTRADAY</span> About 50K Fund.
                </p>
              </li>
            </ol>
            <p className="text-xs font-semibold text-slate-600 pt-2">
              Issued in the interest of Investors
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
                Registered and Corporate Office
              </h3>
              <div className="flex gap-3">
                <span className="text-2xl">📍</span>
                <p className="text-sm leading-relaxed text-slate-400">
                  63/67, Ajmera House,<br />
                  Pathakwadi, Off K. H. Ajmera Chowk,<br />
                  Mumbai, 400002
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">👥</span>
                <div className="flex gap-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-sky-500 hover:text-white transition-colors">
                    <span className="text-sm">f</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-pink-500 hover:text-white transition-colors">
                    <span className="text-sm">📷</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">
                    <span className="text-sm">in</span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-black hover:text-white transition-colors">
                    <span className="text-sm">𝕏</span>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-red-600 hover:text-white transition-colors">
                    <span className="text-sm">▶</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Call Us Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
                Call Us @
              </h3>
              <div className="flex gap-3">
                <span className="text-2xl">📞</span>
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">
                    <a href="tel:+912260628009" className="hover:text-sky-400 transition-colors">
                      +91 22 6062 8009
                    </a>
                  </p>
                  <p className="text-sm text-slate-400">
                    <a href="tel:+912365069999" className="hover:text-sky-400 transition-colors">
                      +91 23 6506 9999
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Us Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
                Email Us @
              </h3>
              <div className="flex gap-3">
                <span className="text-2xl">✉️</span>
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">
                    <a href="mailto:support@ajmeraexchange.in" className="hover:text-sky-400 transition-colors">
                      support@ajmeraexchange.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-700 pt-6">
            <p className="text-center text-xs text-slate-500">
              © {new Date().getFullYear()} Ajmeraexchange pvt ltd. All rights reserved
            </p>
            <p className="mt-2 text-center text-xs text-slate-600">
              privacy policy | terms and conditions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
