type UserData = Record<string, string>;

export default function DynSelect({
  placeholder,
  field,
  value,
  userData,
  setUserData,
  isEdit,
  options,
}: {
  placeholder: string;
  field: string;
  value: string;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isEdit: boolean;
  options: string[];
}) {
  return isEdit ? (
    <div>
      <label>{placeholder}</label>
      <select
        value={userData[field] ?? value}
        aria-label={placeholder}
        onChange={(e) => {
          setUserData({ ...userData, [field]: e.target.value });
        }}
        className="mt-1 w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-base outline-none focus:border-[var(--coral)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)] dark:bg-[#1b302e] dark:text-[#f6f1e8]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
