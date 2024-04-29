import { FormUpload } from "@/components/formUpload";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/files", {
    cache: "no-store",
  });
  const { data } = await res.json();

  const publicUrl = "https://pub-2e9d98e6db4b4ecea606d56439aa9331.r2.dev/devscale-batch5";

  return (
    <div>
      <FormUpload />
      <div>
        {data.map((item) => {
          return (
            <div key={item.key}>
              <Image src={`${publicUrl}/${item.id}/${item.key}`} width={100} height={100} />
              <div>{item.key}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
