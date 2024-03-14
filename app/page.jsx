import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full">
      <div className="flex flex-center flex-col ">
        <h1 className="head_text text-center">Discover & Share</h1>
        <h1 className="head_text orange_gradient text-center">
          Ai powered prompts
        </h1>
        <p className="desc text-center">
          Prompotopia is an open source AI platform tool for modern world to
          discover create and share creative prompts
        </p>
      </div>
      <Feed />
    </section>
  );
};

export default Home;
