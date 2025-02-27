import { AdminContainer } from "@/src/components/admin/AdminContainer";


export default async function AdminSecurePage(props : {params : Promise<{id : string}>, searchParams? : Promise<{option : string}>}) {
    const searchParams = await props.searchParams
    const params = await props.params;
    const id = await params.id;

    const option = searchParams?.option;
    if(id !== "1029384756"){
        return (
        <div className="flex flex-col items-center justify-center w-full h-screen font-delicious-small-caps text-3xl">
            <h1>No tienes permisos para acceder a esta página</h1>
            😒
        </div>
        )
    }

    return (
        <section className="flex flex-col items-center justify-center w-[95%] rounded-lg gap-5 mx-auto mb-20 p-6 min-h-[500px]">
            <h1 className="font-nunito text-2xl">Admin Page</h1>
            <AdminContainer option={option}/>
        </section>
    )

}