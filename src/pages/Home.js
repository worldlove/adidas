import React, {Component} from "react";
import {Carousel} from "antd";
import "../css/home.css";

const imgs = [
	{
		img: "imgs/1.png",
		content: "第一张图片"
	},
	{
		img: "imgs/2.png",
		content: "年终大促销"
	},
	{
		img: "imgs/3.png",
		content: "健康助手"
	},
	{
		img: "imgs/4.png",
		content: "最新科技"
	}
];

class Home extends Component {
	render() {
    console.log("Props", this.props);
		return (
			<div className="home">
				<Carousel autoplay>
				{
					imgs.map((img, i) => {
						return (
							<div key={i}>
								<img style={{margin: "auto"}} src={img.img} alt={img.img}/>
								<h3>{img.content}</h3>
							</div>
						)
					})
				}
				</Carousel>
			</div>
		);	
	}
}

export default Home;