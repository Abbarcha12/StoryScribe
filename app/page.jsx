
import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h2 className="head_text text-center ">Share Your <span className="blue_gradient">Coding Journey</span> </h2>
    <p className="desc text-center">
    StoryScribe is an open-source artificial intelligence (AI) prompting tool enabling the modern world to explore, create, and share their coding adventure.
    </p>  
    <Feed/>
    </section>
  )
}

export default Home