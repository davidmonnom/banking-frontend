import Home from "./home/Home";

// Hack to be able to access home from /home URL
export default function Index() {
  return (
      <Home />
  );
}
