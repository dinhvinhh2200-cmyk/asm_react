import React from "react";
import Nav from "../layout/Nav";

const Layout = (props) => {
	return (
		<div>
			<div className="d-flex">
				<Nav />

				<div
					className="flex-grow-1 p-4 bg-light"
					style={{ minHeight: "100vh" }}
				>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
