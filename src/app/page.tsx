"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, ChangeEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";


export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const users: string[] = ["Saurbh", "Harmeet", "Dhirendra"];
  useEffect(()=>{
     const alreadyUser:string | null  = localStorage.getItem("user");
     console.log(typeof(alreadyUser))
     
     if(alreadyUser){
      router.push(`/dashboard/${alreadyUser}`);
     }
  },[])

  const handleLogin = () => {
    console.log(username);
    try {
      setLoading(true);
      const isUser: boolean = users.includes(username);
      console.log(isUser);
      if (isUser) {
        localStorage.setItem("user",username)
        router.push(`/dashboard/${username}`);
        toast({
          description: "User login successfully",
        });
      }else{
        toast({
          variant: "destructive",
          description: "User not found",
        });
      }
    } catch (error) {
       console.error(error);
       
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // console.log(username)
  };

  return (
    <div className="register-section h-screen flex justify-center items-center">
      <div className="flex gap-x-2">
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleChange}
        />
        <Button onClick={handleLogin}>{loading ? "Searching" :"Enter"}</Button>
      </div>
    </div>
  );
}
