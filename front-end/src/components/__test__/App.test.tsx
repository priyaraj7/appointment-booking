// // import { render, unmountComponentAtNode } from "react-dom";
// import { createRoot } from "react-dom/client";
// import userEvent from '@testing-library/user-event'
// import { act } from "react-dom/test-utils";
// import { MemoryRouter } from "react-router-dom";
// import App from "../../App";

// describe("home page", () => {

//   test('full app rendering/navigating', async () => {
//    // render(<App />, {wrapper: BrowserRouter})
//    // const user = userEvent.setup()

//     // verify page content for default route
//    // expect(screen.getByText(/you are home/i)).toBeInTheDocument()

//     // verify page content for expected route after navigating
//    // await user.click(screen.getByText(/about/i))
//     //expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
//   it("default navigation file", () => {
//     // in a real test a renderer like "@testing-library/react"
//     // would take care of setting up the DOM elements
//     const root = document.createElement("div");
//     document.body.appendChild(root);

//     // Render app
//     const rootEl = createRoot(root);
//     rootEl.render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );
//   });
// });

export {};
