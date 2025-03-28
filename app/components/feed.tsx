"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { MapPin, Paperclip, Smile } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";

const Feed = () => {
	const { user } = useUser();

	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setLoading(true);

		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();

		setImageUrls((prevUrls) => [...prevUrls, data.secure_url]); // Append new image URL
		setLoading(false);

		event.target.value = ""; // Reset input so the same file can be selected again
	};

	return (
		<div className="w-6/12 h-full p-5">
			<div className="bg-gray-50 rounded-xl px-4 py-2 flex flex-col gap-2">
				<div className="flex items-center space-x-3">
					{user?.imageUrl && (
						<Image
							src={user?.imageUrl}
							alt="User"
							width={40}
							height={25}
							className="rounded-full"
						/>
					)}
					<Textarea className="mt-3.5" placeholder="What are you thinking?" />
				</div>
				<div className="flex justify-between mt-2">
					<div className="flex gap-2 text-slate-400">
						<input
							type="file"
							onChange={handleUpload}
							className="hidden"
							id="file-upload"
						/>

						<label
							htmlFor="file-upload"
							className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
						>
							{loading ? "Uploading..." : "Upload Image"}
						</label>

						{/* Display all uploaded images */}
						{imageUrls.length > 0 && (
							<div className="mt-4 flex gap-2 flex-wrap">
								{imageUrls.map((url, index) => (
									<img
										key={index}
										src={url}
										alt="Uploaded"
										className="w-32 h-32 rounded-lg"
									/>
								))}
							</div>
						)}
						<Paperclip size={22} />
						<MapPin size={22} />
						<Smile size={22} />
					</div>

					<Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
						Post
					</Button>
				</div>

				{/* Display uploaded images */}
				{imageUrls.length > 0 && (
					<div className="mt-4">
						{imageUrls.map((url, index) => (
							<CldImage
								src={url}
								key={index}
								width={500}
								height={300}
								alt="Cloudinary Image"
								crop="fill"
								gravity="auto"
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Feed;
