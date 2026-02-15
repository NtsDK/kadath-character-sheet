import classnames from "classnames";

export function InputError({ error }: { error?: string }) {
  return (
    <div
      className={classnames("tw-text-red-600 tw-mt-1", {
        "tw-invisible": !error,
      })}
    >
      {error}
    </div>
  );
}
