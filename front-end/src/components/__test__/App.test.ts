import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from "react-router-dom";
import App from "../../App";


it("default navigation file", () => {
    // in a real test a renderer like "@testing-library/react"
    // would take care of setting up the DOM elements
    const root = document.createElement('div');
    document.body.appendChild(root);
  
    // Render app
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
      root
    );