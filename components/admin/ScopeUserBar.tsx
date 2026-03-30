"use client";

type U = { _id: string; clientId?: string; email?: string; fullName?: string };

export function ScopeUserBar({
  scopeUserId,
  onScopeChange,
  onLoad,
  users,
}: {
  scopeUserId: string;
  onScopeChange: (v: string) => void;
  onLoad: () => void;
  users: U[];
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <label className="text-xs font-medium text-slate-500">
          Config scope — user ID (empty = global default)
        </label>
        <input
          value={scopeUserId}
          onChange={(e) => onScopeChange(e.target.value)}
          className="mt-1 block w-full min-w-[280px] rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
          placeholder="MongoDB user _id"
        />
      </div>
      <select
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
        value=""
        onChange={(e) => {
          if (e.target.value) onScopeChange(e.target.value);
        }}
      >
        <option value="">Quick pick user…</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.clientId || u.email || u.fullName || u._id}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => onLoad()}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Load
      </button>
    </div>
  );
}
