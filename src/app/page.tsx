import getTodos from "@/actions/getTodos";
import Slider from "@/components/Slider";
import Todos from "@/components/Todos";
import CreateTodoForm from "@/components/CreateTodoForm";
import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const limit = Number(searchParams.limit) || 0;
  const session = await getServerSession(authOptions);

  //TODO: should not call getTodos if session is not valid
  const data = await getTodos(limit);
  const total = data[0];
  const todos = data[1];

  return (
    <main>
      <h1 className="text-center text-xl p-6">Todos</h1>
      <Profile />
      {!!session && (
        <>
          <section className="flex flex-col justify-center items-center">
            <CreateTodoForm />
          </section>
          <section className="flex flex-col justify-center items-center">
            <p className="text-sm p-4">Show how many? (Total: {total})</p>
            <Slider currentValue={limit} max={total} />
          </section>
          <section className="pt-12">
            <Todos todos={todos} />
          </section>
        </>
      )}
    </main>
  );
}
