type UserData = Record<string, any>;

export default function DynField({
  type,
  placeholder,
  field,
  value,
  userData,
  setUserData,
  isEdit,
}: {
  type: string;
  placeholder: string;
  field: string;
  value: string;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isEdit: boolean;
}) {
  return isEdit ? (
    <div>
      <label>{placeholder}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          setUserData({ ...userData, [field]: e.target.value });
        }}
        className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-lg text-white outline-none placeholder:text-white/60 focus:border-white"
      />
    </div>
  ) : (
    <p className="text-xl font-semibold text-white">{value}</p>
  );
}
