import React, { useState, useEffect } from 'react';
import { ForceGraph2D, ForceGraphNode, ForceGraphLink } from 'react-force-graph';
import axios from 'axios';
import { Button } from 'antd';

const UserSimilarityGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [switchState, setState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
                // Retrieve token from local storage
                const token = localStorage.getItem('token'); // Replace with your token key

                if (!token) {
                  throw new Error('Missing token in local storage'); // Handle missing token
                }
        
                // Create headers with authorization
                const headers = {
                  Authorization: `Bearer ${token}`,
                };
                const response = await axios.get(`http://localhost:3001/v1/users/recommendations/${switchState? "education": "experience"}`, { headers });
                setData(response.data.map(user => ({
                  id: user.user.id,
                  val: parseFloat(user.similarityPercentage),
                  name: `${user.user.firstName} ${user.user.lastName}`,
                  // Add user object for link information (if available)
                  user: user.user, // Replace with relevant user data property
                })));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [switchState]);

  const nodes = data.map(user => ({
    id: user.user.id,
    val: parseFloat(user.similarityPercentage), // Ensure percentage as number
    name: `${user.user.firstName} ${user.user.lastName}`
  }));

  const links = data.map((user, index) => {
    // Create links between users (modify based on your user data structure)
    if (index < data.length - 1) {
      return {
        id: `link-${user.id}-${data[index + 1].id}`,
        source: user.id,
        target: data[index + 1].id,
        value: user.val, // Use similarity percentage for link thickness
      };
    }
    return null;
  }).filter(link => link); // Remove null links


  const content = loading ? (
    <p>Loading data...</p>
  ) : error ? (
    <p>Error fetching data: {error.message}</p>
  ) : (
    <ForceGraph2D
      graphData={{ nodes, links }}
      backgroundColor="#f0f0f0"
      d3ForceSimulation={d3 => {
        const simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(d => d.id))
          // Stronger repulsion for more space
          .force("charge", d3.forceManyBody().strength(-300))
          // Adjust centering based on your container size
          .force("center", d3.forceCenter(width / 2, height / 2));
  
        return simulation;
      }}
      nodeAutoColorBy="val"
      nodeValuator={node => node.val} // Use similarity percentage as node size
      nodeLabel="name"
nodeColor={(node) => {
  const colorValue = Math.min(1, node.val * 2); // Adjust multiplier for wider nodes
  const color = `rgba(0, 0, 255, ${colorValue})`; // Adjust color scheme
  return color;
}}
      nodeCanvasObject={(node, ctx, scale) => {
        const fontSize = 6; // Adjust font size as needed
        ctx.fillStyle = 'black';
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + fontSize / 2);
      }}
      linkCanvasObject={(link, ctx, scale) => {
        const thickness = 1; // Adjust thickness based on similarity
        ctx.lineWidth = thickness;
        ctx.strokeStyle = '#ccc'; // Adjust color
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.stroke();
      
        // Optional: Show similarity percentage on the link (adjust placement as needed)
        const labelX = (link.source.x + link.target.x) / 2;
        const labelY = (link.source.y + link.target.y) / 2;
        ctx.fillStyle = 'black';
        ctx.font = '6px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${link.value}%`, labelX, labelY);
      }}
    />
  );

  return (
    <div>
      <h1>User Similarity Graph {switchState? "Education": "Experience"}</h1>
      <Button onClick={()=> setState(!switchState)}>Switch to {switchState? "Education": "Experience"}</Button>
      {content}
    </div>
  );
};

export default UserSimilarityGraph;
