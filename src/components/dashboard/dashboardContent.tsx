import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../API/firebase";
import DashboardLayout from "./dashboardLayout";
import DashboardCard from "./dashboardCard";
import "tailwindcss/tailwind.css";

type UserData = {
  alamat: string;
  jabatan: string;
  nama: string;
  npsn: string;
  pangkat: string;
  unitKerja: string;
};

export default function Dashboard() {
  const router = useRouter();
  const { npsn } = router.query;
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof npsn === "string") {
        const docRef = doc(db, "users", npsn);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        }
      }
    };

    fetchData();
  }, [npsn]);

  return (
    <DashboardLayout>
      <h1 className="mb-3 text-lg font-semibold md:text-2xl">
        KUESIONER KINERJA GURU <span className="text-sm font-light">SDN Lorem, ipsum dolor.</span>
      </h1>

      <DashboardCard borderColor="border-blue-400">
        <h1 className="border-b-[1px] border-b-slate-300 px-2 py-4">Biodata header</h1>
        <div className="mx-2 mb-3 h-full w-full p-2 text-xs font-normal md:text-base md:last:font-medium">
          {userData && (
            <table>
              <tr>
                <td className="">Nama</td>
                <td className=" pl-8 pr-2 md:pl-12 md:pr-2">:</td>
                <td className="text-blue-700">{userData.nama}</td>
              </tr>
              <tr>
                <td className="">NPSN</td>
                <td className=" pl-8 pr-2 md:pl-12 md:pr-2">:</td>
                <td className="text-blue-700">{userData.npsn}</td>
              </tr>
              <tr>
                <td className="">Alamat</td>
                <td className=" pl-8 pr-2 md:pl-12 md:pr-2">:</td>
                <td className="text-blue-700">{userData.alamat}</td>
              </tr>
              <tr>
                <td className="">Jabatan</td>
                <td className=" pl-8 pr-2 md:pl-12 md:pr-2">:</td>
                <td className="text-blue-700">{userData.jabatan}</td>
              </tr>

              <tr>
                <td className="">Pangkat</td>
                <td className=" pl-8 pr-2 md:pl-12 md:pr-2">:</td>
                <td className="text-blue-700">{userData.pangkat}</td>
              </tr>
              <tr>
                <td className="">Unit Kerja</td>
                <td className=" pl-8 pr-2 md:pl-12 md:pr-2">:</td>
                <td className="text-blue-700">{userData.unitKerja}</td>
              </tr>
            </table>
          )}
        </div>
      </DashboardCard>
    </DashboardLayout>
  );
}