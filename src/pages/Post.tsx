import Layout from "@/components/Layout";
import { useParams } from "react-router-dom";

const Post = () => {
  const params = useParams();
  console.log(params);

  return (
    <Layout>
      <div>Post</div>
    </Layout>
  );
};

export default Post;
