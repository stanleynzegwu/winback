interface PropsInterface {
  params: { id: number };
  //   searchParams: {};
}

const User = ({ params }: PropsInterface) => {
  return <div className="p-4 min-h-screen bg-white rounded-xl">user {params.id}</div>;
};

export default User;
