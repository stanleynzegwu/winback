interface PropsInterface {
  params: { id: number };
  //   searchParams: {};
}

const User = ({ params }: PropsInterface) => {
  return <div>{params.id}</div>;
};

export default User;
