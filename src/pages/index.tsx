import Navbar from "@/components/Navbar";
import Image from "next/image";
import Vector1 from "../../public/Vector1.png";
import Vector1_mobile from "../../public/Vector1_mobile.png";
import planet from "../../public/planet.png";
import zoonet from "../../public/zoonet.png";
import dog from "../../public/dog.png";
import Vector2 from "../../public/Vector2.png";
import Vector2_mobile from "../../public/Vector2_mobile.png";
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
import { useFetchUser } from "@/services/user/fetchUser";
import React from "react";
import { useFetchReviews } from "@/services/reviews/fetchReviews";
import footprints_left from "../../public/footprints_left.png";
import footprints_right from "../../public/footprints_right.png";
import footprints_left_bottom from "../../public/footprints_left_bottom.png";

export default function Home() {
	const [user] = useFetchUser();
	const [reviews] = useFetchReviews();

	const href = user ? "/services/add/pets" : "/account/login";

	if (!reviews) return <h1>Еще нет отзывов</h1>;

	return (
		<>
			<div className="flex max-w-screen-xl mx-auto">
				<div className=" left-block-head relative w-1/2 mx-auto ">
					<Image
						src={Vector1}
						alt="error"
						className=" relative mx-auto max-sm:hidden"
					/>
					<Image
						src={Vector1_mobile}
						alt="error"
						className=" relative mx-auto max-sm:block hidden"
					/>

					<Image
						src={planet}
						alt="error"
						className=" absolute top-2/4 max-xl:top-1/3 max-xl:w-1/2 max-xl:mx-10 max-md:top-1/4 max-sm:w-full max-sm:left-1/2 max-sm:top-10"
					/>
					<Image
						src={zoonet}
						alt="error"
						className=" absolute top-2/3 right-0 max-xl:top-1/2 max-xl:w-1/2 max-md:top-1/3 max-sm:w-full max-sm:left-2/3 max-sm:top-20 max-sm:mx-0"
					/>

					<h2 className=" w-2/3 my-10 mx-auto max-md:right-0">
						<span className=" text-bluelogin font-bold text-2xl ">
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
							className=" mx-20"
						>
							<span className="flex items-center mx-auto justify-center ">
								Добавить объявление <ArrowNarrowRight className="mx-2" />
							</span>
						</button>
					</Link>
					<Image
						src={footprints_left}
						alt="error"
						className=" absolute top-2/3 right-0 z-[-1]"
					/>
				</div>

				<div className=" relative right-block-head mx-auto w-1/2 max-sm:right-[-1/2]">
					<Image
						src={Vector2}
						alt="error"
						className=" absolute top-1/4 z-[-3]  max-sm:hidden"
					/>
					<Image
						src={footprints_right}
						alt="error"
						className=" absolute top-1/2 right-1/2 z-[-1] max-lg:w-1/2 max-lg:top-1/3 lg:right-1 lg:top-1/2 max-xl:w-1/2 max-xl:right-0"
					/>
					<Image
						src={Vector2_mobile}
						alt="error"
						className=" absolute top-1/3 z-[-3] max-sm:block hidden left-1/4 "
					/>
					<Image
						src={dog}
						alt="error"
						className=" absolute z-1 max-sm:right-1/4 max-sm:top-1/3 max-sm:w-full"
					/>
				</div>
			</div>

			<section id="aboutus">
				<div className="our-mission max-w-screen-xl mx-auto">
					<Image src={mission} alt="error" className=" mt-20 mx-auto" />
					<Image src={logocentr} alt="error" className=" mx-auto" />
					<h2 className=" w-3/4  mx-auto text-center">
						<span className=" text-bluelogin font-bold text-2xl ">
							Наша миссия
						</span>
						- помочь животным найти добрые руки! Мы хотим объединить
						питомники/приюты/частных заводчиков и людей ищущих на одной
						платформе, чтобы все животные имели шанс найти своего доброго и
						любящего хозяина.
					</h2>

					<div className="">
						<ul className=" my-10 text-center grid-cols-3">
							<li className=" my-10 w-1/2 mx-auto ">
								<Image src={li1} alt="error" className="mx-auto" />
								<h3>Объявления</h3>
								<p>
									На сайте можно разместить неограниченное количество объявлений
									о продаже животных
								</p>
							</li>
							<li className=" my-10 w-1/2 mx-auto ">
								<Image src={li2} alt="error" className="mx-auto" />
								<h3>Легкие покупки</h3>
								<p>
									Клиент покупает у продавца питомца напрямую, связавшись через
									чат или контактный номер и нет дополнительных комиссий от
									сайта Zoo.Net
								</p>
							</li>
							<li className=" my-10 w-1/2 mx-auto ">
								<Image src={li3} alt="error" className="mx-auto" />
								<h3>Помощь</h3>
								<p>
									Мы помогаем бездомным животным найти добрых и заботливых
									хозяев.
								</p>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section id="feedbackblock">
				<div className="feedback max-w-screen-xl mx-auto flex mt-20 relative">
					<Image
						src={feedback}
						alt="error"
						className="mx-auto absolute right-1/2 z-10 max-md:right-1/3 max-lg:right-1/3 max-xl:right-1/3"
					/>
					<div className=" w-1/2 relative">
						<Image
							src={footprints_left_bottom}
							alt="error"
							className=" absolute left-0"
						/>
						<Image
							src={Vector3}
							alt="error"
							className=" feedback-message left-0 max-sm:hidden"
						/>
						<div
							className=" absolute top-1/3 right-0  max-lg:w-3/4 max-lg:h-2/3 max-xl:w-2/3 max-xl:h-1/2 max-2xl:w-3/4 max-2xl:h-1/2 max-md: w-3/4 max-md:"
							style={{
								borderTopLeftRadius: "117px",
								borderBottomLeftRadius: "117px",
								borderTopRightRadius: "117px",
								boxShadow:
									"inset 0px 4px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset -4px 0px 4px rgba(117, 117, 117, 0.1)",
								background: "rgba(243, 243, 243, 0.85)",
								// height: "280px",
								// width: "430px",
							}}
						>
							<div className="feedblack-text mt-20 w-2/3 mx-auto text-center max-lg:mt-10">
								{reviews.map((item) => (
									<div key={item.id}>
										<h3 style={{ borderBottom: "1px solid gray" }}>
											{item.name}
										</h3>
										<p>{item.message}</p>
									</div>
								))}
							</div>
							<Link href="/reviews/add/">
								<button
									style={{
										color: "blue",
										backgroundColor: "yellow",
										boxShadow: "10px 10px 0px 4px #988CE1",
										borderRadius: "2rem",
										transition: "all 0.3s ease",
										height: "60px",
										width: "70%",
										// marginTop: "100px",
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
										e.currentTarget.style.boxShadow =
											"10px 10px 0px 4px #988CE1";
									}}
									className=" mt-40 max-lg:mt-20 max-md:mt-10"
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
							className="mx-auto absolute top-20 right-14 max-lg:w-2/3"
						/>
					</div>
				</div>
			</section>

			<section id="articles">
				<div className=" max-w-screen-xl mx-auto">
					<Image src={statestitle} alt="error" className=" mx-auto mt-40" />

					<ul className=" grid grid-cols-3 gap-5 my-10 text-center max-xl:grid-cols-2 max-lg:grid-cols-1 max-lg:w-3/4 mx-auto">
						<li
							className="  p-5"
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
								“Lorem ipsum dolor sit amet consectetur. Bibendum et nisi
								euismod viverra. Tincidunt ultricies porttitor netus ut dolor.
								Quis e
							</p>
							<a href="#" style={{ color: "blue" }} className=" ">
								Посмотреть подробнее
							</a>
						</li>
						<li
							className=" p-5"
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
								“Lorem ipsum dolor sit amet consectetur. Bibendum et nisi
								euismod viverra. Tincidunt ultricies porttitor netus ut dolor.
								Quis e
							</p>
							<a href="#" style={{ color: "blue" }} className=" ">
								Посмотреть подробнее
							</a>
						</li>
						<li
							className="  p-5"
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
								“Lorem ipsum dolor sit amet consectetur. Bibendum et nisi
								euismod viverra. Tincidunt ultricies porttitor netus ut dolor.
								Quis e
							</p>
							<a href="#" style={{ color: "blue" }} className=" ">
								Посмотреть подробнее
							</a>
						</li>
					</ul>
				</div>
			</section>
			{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46812.400530386025!2d74.6002732!3d42.8353657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb61f8eba31d5%3A0xa84c40ec477ce475!2sAtaturk%20Park!5e0!3m2!1sru!2skg!4v1682146242953!5m2!1sru!2skg" width="400" height="300" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>		 */}
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
