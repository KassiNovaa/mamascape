import { NavLink } from 'react-router-dom';
import { GridItem, MenuButton, Menu, MenuItem, MenuList, Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';

function Navbar({ user,setUser }){

    function handleLogout(){
        fetch('/logout', {
          method: 'DELETE',
        }).then((resp)=>{
          if(resp.ok){
            setUser(null)
            // navigate to another route?
          }
        })
      }


    return (
        <GridItem align="right" pl="2" bg="green.400" area="header">
        <Flex align="center" justify="space-between">
          <Menu>
            <MenuButton p="2">
              <Avatar size="md" name={user.firstname} />
            </MenuButton>
            <MenuList>
              <MenuItem as={NavLink} to= "/favoriteAffirmations">
                Favorite Affirmations
              </MenuItem>
              <MenuItem as={NavLink} to="/journalEntries">
                Journal Entries
              </MenuItem>
              <MenuItem onClick={handleLogout} as="a" type="submit">
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
          <Breadcrumb p="3">
            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/journal">
                Journals
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/resources">
                Resources
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </GridItem>
    );
  }

export default Navbar;