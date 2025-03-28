import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const authHeader = req.headers.get("Authorization");
		if (!authHeader)
			return Response.json({ error: "No token provided" }, { status: 401 });

		const token = authHeader.replace("Bearer ", "");
		const decoded: any = jwt.decode(token); // Decode JWT

		if (!decoded)
			return Response.json({ error: "Invalid token" }, { status: 401 });
		console.log(decoded);
		const { id, email, fullName, profileImage, lastSignIn, username } = decoded;

		const existingUser = await prisma.user.findUnique({ where: { id } });

		if (!existingUser) {
			const newUser = await prisma.user.create({
				data: {
					id,
					username: username ? username : email.split("@")[0],
					email,
				},
			});

			return Response.json({ message: "User created", user: newUser });
		}

		return Response.json({
			message: "User already exists",
			user: existingUser,
		});
	} catch (error) {
		return Response.json(
			{ error },
			{ status: 500 }
		);
	}
}
