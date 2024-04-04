"use client"
import { Responsive, WidthProvider } from "react-grid-layout"
import DashboardBrowser from "../components/g_browser"
import DashboardDevice from "../components/g_devices"
import DashboardMap from "../components/g_geolocalisation"
import DashboardTime from "../components/g_time"
const ResponsiveReactGridLayout = WidthProvider(Responsive)

export const GridLayout = () => {
	const layout = [
		{ i: "a", x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2, maxH: 2 },
		{
			i: "b",
			x: 0,
			y: 2,
			w: 6,
			h: 2,
			minW: 3,
			minH: 2,
			maxH: 2,
			maxW: 6,
		},
		{ i: "c", x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2, maxH: 2 },
		{
			i: "d",
			x: 6,
			y: 2,
			w: 6,
			h: 2,
			minW: 3,
			minH: 2,
			maxH: 2,
			maxW: 6,
		},
	]
	const cols = { lg: 12, md: 12, sm: 4, xs: 2, xxs: 1 }

	return (
		<ResponsiveReactGridLayout
			className="layout"
			layouts={{ lg: layout }}
			cols={cols}
		>
			<div
				key="a"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					border: "1px solid black",
				}}
			>
				<DashboardBrowser clientId={1} />
			</div>
			<div
				key="b"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					border: "1px solid black",
				}}
			>
				<DashboardMap userId={1} />
			</div>
			<div
				key="c"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					border: "1px solid black",
				}}
			>
				<DashboardDevice clientId={1} />
			</div>
			<div
				key="d"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					border: "1px solid black",
				}}
			>
				<DashboardTime clientId={1} />{" "}
				{/* Ajout du composant DashboardTime avec le prop clientId */}
			</div>
		</ResponsiveReactGridLayout>
	)
}
