import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
	return (
		<div className="h-18 flex justify-between items-center px-4 bg-gray-50">
			<div className="flex items-center">
				<Image src="/logo.png" width={40} height={40} alt="Logo" />
			</div>

			<div className="flex items-center gap-2 py-2 px-4 h-full rounded-4xl w-5/12 relative">
				<div className="absolute right-6 top-1/2 -translate-y-1/2 flex justify-center items-center space-x-0.5">
					<Button className="border-0 shadow-none focus:ring-0 bg-transparent hover:bg-transparent hover:cursor-pointer h-5 w-5 text-gray-500">
						<Search />
					</Button>
				</div>

				<Input
					className="rounded-3xl bg-gray-200 h-9/12"
					placeholder="Search for someone"
				/>
			</div>

			<div>Temp</div>
		</div>
	);
};
