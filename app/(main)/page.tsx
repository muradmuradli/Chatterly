import Feed from "../components/feed";
import LeftSidebar from "../components/left-sidebar";
import RightSidebar from "../components/right-sidebar";

export default function Home() {
	return (
		<div className="flex h-screen">
			<LeftSidebar />
			<Feed />
			<RightSidebar />
		</div>
	);
}
