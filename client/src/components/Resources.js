import React, { useState, useEffect } from 'react';

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/resources')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.links) {
          setResources(data.links);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  console.log(resources,'resources');


  const rlist = resources.map((resource) => (
    <li key={resource.id}>{resource.description}<a href={resource.url}>{resource.title}</a></li>
  ));

  return (
    <div>
      <h1>Resource Page</h1>
      <ul>{rlist}</ul>
    </div>
  );
}

export default Resources;