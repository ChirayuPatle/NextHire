import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      This is home page
      <Button onClick={() => navigate("/feedback")} >Click me</Button>
    </div>
  )
}

export default Home
