"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
	useAuth,
	useUser,
} from "@clerk/nextjs";
import { BellRing, LogIn, MessageCircleIcon, Search } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export const Navbar = () => {
	const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
	const { user } = useUser();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const token = await getToken();
	// 		if (token) {
	// 			try {
	// 				const res = await fetch("/api/auth", {
	// 					method: "POST",
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						Authorization: `Bearer ${token}`,
	// 					},
	// 				});
	// 				const data = await res.json();
	// 				console.log(data);
	// 			} catch (error) {
	// 				console.log(error)
	// 			}
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	return (
		<div className="h-18 flex justify-between items-center px-4 bg-gray-50 border-b-[2px] border-b-slate-200">
			<div className="flex items-center">
				<Image src="/logo.png" width={140} height={140} alt="Logo" />
			</div>

			<div className="flex items-center gap-2 py-2 px-4 h-full rounded-4xl w-5/12 relative">
				<div className="absolute right-6 top-1/2 -translate-y-1/2 flex justify-center items-center space-x-0.5">
					<Button
						variant="ghost"
						className="border-0 shadow-none focus:ring-0 bg-transparent hover:bg-transparent hover:cursor-pointer h-5 w-5 text-gray-500"
					>
						<Search />
					</Button>
				</div>

				<Input
					className="rounded-3xl text-xs bg-gray-200 h-10 px-4 py-2"
					placeholder="Search for someone"
				/>
			</div>

			<div className="flex items-center gap-2.5">
				<Button
					variant="ghost"
					className="shadow shadow-slate-300 cursor-pointer"
				>
					<MessageCircleIcon />
				</Button>
				<Button
					variant="ghost"
					className="shadow shadow-slate-300 cursor-pointer"
				>
					<BellRing />
				</Button>
				<SignedOut>
					<SignUpButton mode="modal">
						<Button className="cursor-pointer bg-blue-500 hover:bg-blue-600">
							<LogIn />
							<span>Sign Up</span>
						</Button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};
