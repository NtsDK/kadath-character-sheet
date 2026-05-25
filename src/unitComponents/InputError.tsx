import classnames from "classnames";

export function InputError({ error, className }: { error?: string, className?: string }) {
  return (
    <div
      className={classnames("tw-text-red-600 tw-mt-1", className, {
        "tw-invisible": !error,
      })}
    >
      {error}
    </div>
  );
}
