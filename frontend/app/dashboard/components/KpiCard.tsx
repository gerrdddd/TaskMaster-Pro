interface Props {
  title: string;
  value: number;
}


export default function KpiCard({
  title,
  value,
}: Props) {

  return (

    <div className="rounded-xl bg-white p-6 shadow-md border border-gray-200">

      <h2 className="text-lg font-semibold text-gray-700">
        {title}
      </h2>


      <p className="mt-4 text-4xl font-bold text-slate-900">
        {value}
      </p>


    </div>

  );
}