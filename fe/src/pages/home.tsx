import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="px-14 py-4" >
      This is home page
      <Button onClick={() => navigate("/feedback")} >Click me</Button>
    </div>
  )
}

export default Home
