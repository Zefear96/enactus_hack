import Navbar from "@/components/Navbar";
import Image from "next/image";
import Vector1 from "../../public/Vector1.png";
import planet from "../../public/planet.png";
import zoonet from "../../public/zoonet.png";
import dog from "../../public/dog.png";
import Vector2 from "../../public/Vector2.png";
import Link from "next/link";
import arrowright from "../../public/arrowright.png";
import { ArrowNarrowRight } from "tabler-icons-react";
import mission from "../../public/mission.png";
import logocentr from "../../public/logocentr.png";
import li1 from "../../public/li1.png";
import li2 from "../../public/li2.png";
import li3 from "../../public/li3.png";
import Vector3 from "../../public/Vector3.png";
import Vector4 from "../../public/Vector4.png";
import Vector4top from "../../public/Vector4top.png";
import feedback from "../../public/feedback.png";
import statestitle from "../../public/statestitle.png";
import { useFetchUser, fetchUser } from "@/services/user/fetchUser";
import React from "react";

export default function Home() {
	const [currentUser] = useFetchUser();
	console.log(currentUser);

	React.useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);

	const href =
		currentUser !== null || undefined ? "/services/add/pets" : "/account/login";

	return (
		<>
			<div className="flex max-w-screen-xl mx-auto">
				<div className=" relative w-1/2 mx-auto">
					<Image src={Vector1} alt="error" className=" relative mx-auto	" />
					<Image src={planet} alt="error" className=" absolute top-2/4 " />
					<Image
						src={zoonet}
						alt="error"
						className=" absolute top-2/3 right-0 "
					/>

					<h2 className=" w-full my-10">
						<span className=" text-bluelogin font-bold text-2xl">
							Сайт по обмену
						</span>
						- покупке/продаже домашних животных, где будет актуальная база
						питомцев со всех регионов страны.
					</h2>

					<Link href={href}>
						<button
							style={{
								color: "blue",
								backgroundColor: "yellow",
								boxShadow: "10px 10px 0px 4px #988CE1",
								borderRadius: "2rem",
								transition: "all 0.3s ease",
								height: "70px",
								width: "70%",
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.backgroundColor = "blue";
								e.currentTarget.style.color = "yellow";
								e.currentTarget.style.boxShadow = "none";
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.backgroundColor = "yellow";
								e.currentTarget.style.color = "blue";
								e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
							}}
						>
							<span className="flex items-center mx-auto justify-center">
								Добавить объявление <ArrowNarrowRight className="mx-2" />
							</span>
						</button>
					</Link>
				</div>

				<div className=" mx-auto w-1/2">
					<Image
						src={Vector2}
						alt="error"
						className=" absolute top-1/4 z-[-1]"
					/>
					<Image src={dog} alt="error" className=" absolute z-2" />
				</div>
			</div>

			<div className="our-mission max-w-screen-xl mx-auto">
				<Image src={mission} alt="error" className=" mt-20 mx-auto" />
				<Image src={logocentr} alt="error" className=" mx-auto" />
				<h2 className=" w-3/4  mx-auto text-center">
					<span className=" text-bluelogin font-bold text-2xl ">
						Наша миссия
					</span>
					- помочь животным найти добрые руки! Мы хотим объединить
					питомники/приюты/частных заводчиков и людей ищущих на одной платформе,
					чтобы все животные имели шанс найти своего доброго и любящего хозяина.
				</h2>

				<div className="">
					<ul className="flex justify-around mt-10 text-center">
						<li className="w-1/3 ">
							<Image src={li1} alt="error" className="mx-auto" />
							<h3>Объявления</h3>
							<p>
								На сайте можно разместить неограниченное количество объявлений о
								продаже животных
							</p>
						</li>
						<li className="w-1/3 ">
							<Image src={li2} alt="error" className="mx-auto" />
							<h3>Легкие покупки</h3>
							<p>
								Клиент покупает у продавца питомца напрямую, связавшись через
								чат или контактный номер и нет дополнительных комиссий от сайта
								Zoo.Net
							</p>
						</li>
						<li className="w-1/3 ">
							<Image src={li3} alt="error" className="mx-auto" />
							<h3>Помощь</h3>
							<p>
								Мы помогаем бездомным животным найти добрых и заботливых хозяев.
							</p>
						</li>
					</ul>
				</div>
			</div>

			<div className="feedback max-w-screen-xl mx-auto flex mt-20 relative">
				<Image
					src={feedback}
					alt="error"
					className="mx-auto absolute right-1/2 z-10"
				/>
				<div className=" w-1/2 relative">
					<Image src={Vector3} alt="error" className=" left-0" />
					<div
						className=" absolute top-1/3 right-0"
						style={{
							borderTopLeftRadius: "117px",
							borderBottomLeftRadius: "117px",
							borderTopRightRadius: "117px",
							boxShadow:
								"inset 0px 4px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset -4px 0px 4px rgba(117, 117, 117, 0.1)",
							background: "rgba(243, 243, 243, 0.85)",
							height: "280px",
							width: "430px",
						}}
					>
						<div className="feedblack-text mt-20 w-2/3 mx-auto">
							<h3 style={{ borderBottom: "1px solid gray" }}>Luisa12_</h3>
							<p>
								“Lorem ipsum dolor sit amet consectetur. Bibendum et nisi
								euismod viverra. Tincidunt ultricies porttitor netus ut dolor!!!
							</p>
						</div>
						<Link href="/services">
							<button
								style={{
									color: "blue",
									backgroundColor: "yellow",
									boxShadow: "10px 10px 0px 4px #988CE1",
									borderRadius: "2rem",
									transition: "all 0.3s ease",
									height: "60px",
									width: "70%",
									marginTop: "100px",
									marginLeft: "100px",
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.backgroundColor = "blue";
									e.currentTarget.style.color = "yellow";
									e.currentTarget.style.boxShadow = "none";
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.backgroundColor = "yellow";
									e.currentTarget.style.color = "blue";
									e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
								}}
							>
								<span className="flex items-center mx-auto justify-center">
									Оставить отзыв
								</span>
							</button>
						</Link>
					</div>
				</div>

				<div className="w-1/2 relative ">
					<Image src={Vector4} alt="error" className=" absolute right-0" />
					<Image
						src={Vector4top}
						alt="error"
						className="mx-auto absolute top-20 right-14 "
					/>
				</div>
			</div>

			<div className=" max-w-screen-xl mx-auto">
				<Image src={statestitle} alt="error" className=" mx-auto" />

				<ul className="flex justify-around mt-10 text-center">
					<li
						className=" w-1/4  p-5"
						style={{
							boxShadow:
								"inset 0px 4px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset -4px 0px 4px rgba(117, 117, 117, 0.1)",
							background: "rgba(243, 243, 243, 0.85)",
							borderRadius: "8px",
						}}
					>
						<h3 style={{ borderBottom: "1px solid gray" }} className=" m-5">
							Советы для владельцев кошек
						</h3>
						<p>
							“Lorem ipsum dolor sit amet consectetur. Bibendum et nisi euismod
							viverra. Tincidunt ultricies porttitor netus ut dolor. Quis e
						</p>
						<a href="#" style={{ color: "blue" }} className=" ">
							Посмотреть подробнее
						</a>
					</li>
					<li
						className=" w-1/4 p-5"
						style={{
							boxShadow:
								"inset 0px 4px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset -4px 0px 4px rgba(117, 117, 117, 0.1)",
							background: "rgba(243, 243, 243, 0.85)",
							borderRadius: "8px",
						}}
					>
						<h3 style={{ borderBottom: "1px solid gray" }} className=" m-5">
							Как приучить питомца
						</h3>
						<p>
							“Lorem ipsum dolor sit amet consectetur. Bibendum et nisi euismod
							viverra. Tincidunt ultricies porttitor netus ut dolor. Quis e
						</p>
						<a href="#" style={{ color: "blue" }} className=" ">
							Посмотреть подробнее
						</a>
					</li>
					<li
						className=" w-1/4  p-5"
						style={{
							boxShadow:
								"inset 0px 4px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset -4px 0px 4px rgba(117, 117, 117, 0.1)",
							background: "rgba(243, 243, 243, 0.85)",
							borderRadius: "8px",
						}}
					>
						<h3 style={{ borderBottom: "1px solid gray" }} className=" m-5">
							Питание для попугая
						</h3>
						<p>
							“Lorem ipsum dolor sit amet consectetur. Bibendum et nisi euismod
							viverra. Tincidunt ultricies porttitor netus ut dolor. Quis e
						</p>
						<a href="#" style={{ color: "blue" }} className=" ">
							Посмотреть подробнее
						</a>
					</li>
				</ul>
			</div>
		</>
	);
}

{
	/* <Link href="/services/add/pets">
						<button
							className="bg-bluelogin text-yellowlogin w-24 h-12 rounded-2xl relative z-[1] hover:bg-yellowlogin hover:text-bluelogin"
							onMouseOver={(e) => {
								e.currentTarget.style.boxShadow = "none";
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
							}}
						>
							Добавить объявление <Image src={arrowright} alt="error" />
						</button>
					</Link> */
}
