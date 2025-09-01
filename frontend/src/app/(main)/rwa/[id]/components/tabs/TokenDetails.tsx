import { tokenDetailsTabParams } from "@/lib/helpers/tokenDetailsTabParams";

export default function TokenDetails({ rwa }: { rwa: any }) {
  return (
    <div className="w-full">
      {tokenDetailsTabParams.map((group, i) => (
        <div key={i} className="not-first:mt-7.5">
          <h3 className="h3 font-semibold mb-5">{group.title}</h3>
          {group.params.map((param, j) => {
            const rawValue = rwa[param.key as keyof typeof rwa];
            const value = param.render ? param.render(rawValue) : rawValue;

            return (
              <div key={j} className="flex gap-3 mt-2">
                <p className="p text-secondary whitespace-nowrap">
                  {param.name}
                </p>
                <div className="flex-1 border-b border-muted/50 mb-1"></div>
                <div className="p whitespace-nowrap">{value}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
