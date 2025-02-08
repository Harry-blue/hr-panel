import Link from "next/link";
import { Briefcase } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Briefcase className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold text-primary">InterviewPro</span>
    </Link>
  );
};

export default Logo;
