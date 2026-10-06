"use client";

import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import DynField from "../components/DynField";
import DynSelect from "../components/DynSelect";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";
import { Link as IntLink } from "@/src/i18n/navigation";
import type { Prisma } from "@/src/generated/prisma/client";

type ProfileUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    createdAt: true;
    language: true;
    theme: true;
    favBooks: { select: { id: true } };
    books: { select: { id: true } };
  };
}>;
type ProfileEdits = Partial<Record<"name" | "language" | "theme", string>>;
type ProfileErrors = Partial<Record<"name" | "save", string>>;

export default function ProfileForm({ initialUser }: { initialUser: ProfileUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState<ProfileEdits>({});
  const t = useTranslations("profile");
  const router = useRouter();
  const [errors, setErrors] = useState<ProfileErrors>({});

  const saveHandler = async () => {
    setErrors({});

    const newErrors: { [key: string]: string } = {};

    if (userData.name !== undefined) {
      if (!userData.name.trim()) {
        newErrors.name = t("errors.REQ", { field: t("fields.name") });
      } else if (userData.name.trim().length < 3) {
        newErrors.name = t("errors.SHORT", { field: t("fields.name") });
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload: ProfileEdits = {};

    if (userData.name !== undefined && userData.name !== initialUser.name)
      payload.name = userData.name.trim();
    if (userData.language && userData.language !== initialUser.language)
      payload.language = userData.language;
    if (userData.theme && userData.theme !== initialUser.theme)
      payload.theme = userData.theme;

    if (Object.keys(payload).length === 0) {
      setIsEdit(false);
      return;
    }

    const { error } = await authClient.updateUser(payload);

    if (error) {
      setErrors({ save: t("errors.UPDATE", { message: error.message ?? "" }) });
    } else {
      setIsEdit(false);
      window.location.reload();
    }
  };

  const logoutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 py-10 text-[var(--ink)] dark:bg-[#122120] dark:text-[#f6f1e8] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/85 shadow-[0_24px_70px_rgba(24,43,42,0.12)] dark:bg-[#1b302e]/90">
          <div className="bg-[var(--teal)] px-6 py-8 text-[#f6f1e8] sm:px-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--coral)] text-2xl font-bold text-white shadow-lg">
                  {initialUser?.name
                    ? initialUser.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <DynField
                  type="text"
                  placeholder={t("fields.name")}
                  field="name"
                  value={initialUser?.name || ""}
                  userData={userData}
                  setUserData={setUserData}
                  isEdit={isEdit}
                />
                {errors.name && (
                  <p role="alert" className="text-sm text-red-200">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isEdit) {
                      setUserData({});
                      setErrors({});
                    }
                    setIsEdit(!isEdit);
                  }}
                  className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  {isEdit ? t("buttons.cancel") : t("buttons.edit")}
                </button>

                {isEdit && (
                  <button
                    type="button"
                    onClick={saveHandler}
                    className="rounded-xl border border-white/30 bg-white px-4 py-2 text-sm font-medium text-[var(--teal)] transition hover:bg-[var(--paper)]"
                  >
                    {t("buttons.save")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {errors.save && (
            <p role="alert" className="px-6 pb-2 text-sm text-red-700 dark:text-red-300 sm:px-10">
              {errors.save}
            </p>
          )}

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-10">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 dark:bg-[#122120]">
              <p className="text-sm font-medium text-[var(--muted)]">
                {t("fields.email")}
              </p>
              <p className="mt-2 text-lg font-semibold">{initialUser?.email}</p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 dark:bg-[#122120]">
              <p className="text-sm font-medium text-[var(--muted)]">
                {t("fields.membership")}
              </p>
              <p className="mt-2 text-lg font-semibold">
                {initialUser?.createdAt
                  ? new Date(initialUser.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <IntLink href={"/favorites"}>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 transition hover:border-[var(--coral)] dark:bg-[#122120]">
                <p className="text-sm font-medium text-[var(--muted)]">
                  {t("fields.favBooks")}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {initialUser?.favBooks?.length}
                </p>
              </div>
            </IntLink>

            <IntLink href={"/myBooks"}>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 transition hover:border-[var(--coral)] dark:bg-[#122120]">
                <p className="text-sm font-medium text-[var(--muted)]">
                  {t("fields.myBooks")}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {initialUser?.books?.length}
                </p>
              </div>
            </IntLink>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 dark:bg-[#122120]">
              <p className="mb-1 text-sm font-medium text-[var(--muted)]">
                {t("fields.lang")}
              </p>
              <DynSelect
                placeholder={t("fields.lang")}
                field="language"
                value={initialUser?.language || "en"}
                userData={userData}
                setUserData={setUserData}
                isEdit={isEdit}
                options={["en", "ar"]}
              />
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 dark:bg-[#122120]">
              <p className="mb-1 text-sm font-medium text-[var(--muted)]">
                {t("fields.theme")}
              </p>
              <DynSelect
                placeholder={t("fields.theme")}
                field="theme"
                value={initialUser?.theme || "system"}
                userData={userData}
                setUserData={setUserData}
                isEdit={isEdit}
                options={["dark", "light", "system"]}
              />
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 dark:bg-[#122120]">
              <p className="mb-1 text-sm font-medium text-[var(--muted)]">
                {t("buttons.logout")}
              </p>
              <button
                type="button"
                className="font-semibold text-[var(--coral)] hover:underline"
                onClick={() => {
                  logoutHandler();
                }}
              >
                {t("buttons.logout")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
