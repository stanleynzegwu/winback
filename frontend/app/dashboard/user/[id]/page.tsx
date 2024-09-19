interface PropsInterface {
  params: { id: number };
  //   searchParams: {};
}

const User = ({ params }: PropsInterface) => {
  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">user {params.id}</div>
  );
};

export default User;
