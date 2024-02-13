import React, { useEffect, useState } from "react";
import SampleCard from "./SampleCard";
import { Col, Layout, Row } from "antd";
import { UsePhoto } from "hook/UsePhoto";

interface PhotoItem {
  id: number;
  title: string;
  image: string;
}

const SwiperComponent: React.FC<{ items: PhotoItem[] }> = ({ items }) => (
  <Layout>
    <h1 style={{color:'#0000'}}>Maybe you want see This Product !!</h1>
    <Row>
      {items.map((img) => (
        <Col xs={12} sm={3} md={4} className="gutter-row" key={img.id}>
          <SampleCard
            btn1="Add"
            btn2="View"
            desc=""
            head={img.title}
            img={img.image}
          />
        </Col>
      ))}
    </Row>
    <h3>Repeat Banner</h3>
    <Row>
      {items.map((img) => (
        <Col xs={12} sm={3} md={4} className="gutter-row" key={img.id}>
          <SampleCard
            btn1="Add"
            btn2="View"
            desc=""
            head={img.title}
            img={img.image}
          />
        </Col>
      ))}
    </Row>
  </Layout>
);

const Banner: React.FC = () => {
  const [list, setList] = useState<PhotoItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UsePhoto();
        setList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SwiperComponent items={list} />
    </div>
  );
};

export default Banner;
