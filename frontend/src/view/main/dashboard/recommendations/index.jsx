import React, { useEffect, useState } from "react";
import { Col, Row, Tabs, Card, Avatar, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;
const { Meta } = Card;

function Recommendations() {
  const [nearbyFriends, setNearbyFriends] = useState([]);
  const [educationalMatches, seteducationalMatches] = useState([]);
  const [experienceMatches, setExperienceMatches] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please Authenticate.");
      history.push("/pages/authentication/login");
    }
  }, [history]);
  useEffect(() => {
    async function fetchNearbyFriends() {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        console.log(token);
        const response = await axios.get(
          "http://localhost:3001/v1/users/all/friends/nearby?longitude=40.764&latitude=-73.974&maxDistance=2",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNearbyFriends(response.data);
      } catch (error) {
        console.error("Error fetching nearby friends:", error);
      }
    }

    async function fetchEducationalMatches() {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        console.log(token);
        const response = await axios.get(
          "http://localhost:3001/v1/users/recommendations/education",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Filter matches with similarityPercentage > 70
        const filteredMatches = response.data.filter(
          (match) => parseFloat(match.similarityPercentage) > 70
        );
        seteducationalMatches(filteredMatches);
      } catch (error) {
        console.error("Error fetching educational matches:", error);
      }
    }

    async function fetchExperienceMatches() {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        console.log(token);
        const response = await axios.get(
          "http://localhost:3001/v1/users/recommendations/experience",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Filter matches with similarityPercentage > 70
        const filteredMatches = response.data.filter(
          (match) => parseFloat(match.similarityPercentage) > 70
        );
        setExperienceMatches(filteredMatches);
      } catch (error) {
        console.error("Error fetching experience matches:", error);
      }
    }

    fetchNearbyFriends();
    fetchEducationalMatches();
    fetchExperienceMatches();
  }, []);

  return (
    <>
      <div>Recommendations</div>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Nearby Friends" key="1">
              <Row gutter={[16, 16]}>
                {nearbyFriends.length == 0 ? (
                  <div style={{marginLeft: "1rem", textAlign: "center"}}>
                    <div>No Nearby Friends found.</div>
                  </div>
                ) : nearbyFriends.map((friend) => (
                  <Col span={8} key={friend.id}>
                    <Card>
                      <Meta
                        avatar={
                          <Avatar
                            src={
                              friend.profileImage
                                ? friend.profileImage
                                : "http://localhost:3001/uploads/fallback-avatar.png"
                            }
                            alt={`${friend.firstName} ${friend.lastName}`}
                          />
                        }
                        title={`${friend.firstName} ${friend.lastName}`}
                        description={friend.email}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>

            <TabPane tab="Educational Matches" key="2">
              <Row gutter={[16, 16]}>
                {educationalMatches.length == 0 ? (
                  <div style={{marginLeft: "1rem", textAlign: "center"}}>
                    <div>No Educational matches found under 70% threshold</div>
                  </div>
                ) : (
                  educationalMatches.map((educationalMatch) => (
                    <Col span={8} key={educationalMatch?.user.id}>
                      <Card>
                        <Meta
                          avatar={
                            <Avatar
                              src={
                                educationalMatch?.user.profileImage
                                  ? educationalMatch?.user.profileImage
                                  : "http://localhost:3001/uploads/fallback-avatar.png"
                              }
                              alt={`${educationalMatch?.user.firstName} ${educationalMatch?.user.lastName}`}
                            />
                          }
                          title={`${educationalMatch?.user.firstName} ${educationalMatch?.user.lastName}`}
                          description={educationalMatch?.user.email}
                        />
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </TabPane>

            <TabPane tab="Experience Matches" key="3">
              <Row gutter={[16, 16]}>
                {educationalMatches.length == 0 ? (
                  <div style={{marginLeft: "1rem"}}>
                    <div>No Experience matches found under 70% threshold</div>
                  </div>
                ) : (
                  experienceMatches.map((experienceMatch) => (
                    <Col span={8} key={experienceMatch?.user.id}>
                      <Card>
                        <Meta
                          avatar={
                            <Avatar
                              src={
                                experienceMatch?.user.profileImage
                                  ? experienceMatch?.user.profileImage
                                  : "http://localhost:3001/uploads/fallback-avatar.png"
                              }
                              alt={`${experienceMatch?.user.firstName} ${experienceMatch?.user.lastName}`}
                            />
                          }
                          title={`${experienceMatch?.user.firstName} ${experienceMatch?.user.lastName}`}
                          description={experienceMatch?.user.email}
                        />
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default Recommendations;
