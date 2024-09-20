interface PropsInterface {
  params: { id: number };
  //   searchParams: {};
}

const CampaignDetail = ({ params }: PropsInterface) => {
  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">campaign {params.id}</div>
  );
};

export default CampaignDetail;
