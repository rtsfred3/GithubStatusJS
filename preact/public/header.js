import { useLocation } from 'preact-iso';

import { h, Component } from 'preact';
import Menu from 'preact-material-components/esm/Menu';
import Button from 'preact-material-components/esm/Button';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Button/style.css';

import TopAppBar from 'preact-material-components/esm/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';

export default class ToolbarPage extends Component {
    render(){
      return (
        <div>
          <TopAppBar className="topappbar">
              <TopAppBar.Row>
                <TopAppBar.Section align-start>
                  {/* <TopAppBar.Icon navigation>menu</TopAppBar.Icon> */}
                  <TopAppBar.Title>
                    My App
                  </TopAppBar.Title>
                </TopAppBar.Section>
                <TopAppBar.Section align-end>
                  <TopAppBar.Icon>more_vert</TopAppBar.Icon>
                </TopAppBar.Section>
              </TopAppBar.Row>
            </TopAppBar>
        </div>
      );
    }
}

// export default class MenuPage extends Component {
//     render(){
//       return (
//         <div>
//           <Menu.Anchor>
//             <Button onClick={e => { this.menu.MDComponent.open = true; }}>
//               Click for menu
//             </Button>
//             <Menu ref={menu => { this.menu = menu; }}>
//               <Menu.Item>Home</Menu.Item>
//               <Menu.Item>Status</Menu.Item>
//               {/* <Menu.Item>Hello3</Menu.Item> */}
//             </Menu>
//           </Menu.Anchor>
//         </div>
//       );
//     }
//   }
  

// export default function Header() {
// 	const { url } = useLocation();
// 	return (
// 		<header>
//             <Menu.Anchor>
//             <Button
//               onClick={
//                 e => { this.menu.MDComponent.open = true; }
//               }>
//               Click for menu
//             </Button>
//                 <Menu ref={
//                     menu => { this.menu = menu; }
//                 }>
//                     <Menu.Item>Home</Menu.Item>
//                     <Menu.Item>Status</Menu.Item>
//                 </Menu>
//             </Menu.Anchor>
// 			<nav>
// 				<a href="/">Home</a>
// 				<a href="/status/">Status</a>
// 			</nav>
// 			<label>
// 				URL:
// 				<input readonly value={url} ref={c => c && (c.size = c.value.length)} />
// 			</label>
// 		</header>
// 	);
// }
