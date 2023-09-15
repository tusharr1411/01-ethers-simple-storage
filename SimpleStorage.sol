// SPDX-License-Identifier: MIT
//optional for some compilers

pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 public favoriteNumber; // sets 0 by default in solidity i.e., = 0;

    People[] public peopleArray;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
        retrieve();
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    //0xd9145CCE52D386f254917e481eB44e9943F39138

    function addPeopleToArray(
        string memory _name,
        uint256 _favoriteNumber
    ) public {
        People memory newPeople = People({
            favoriteNumber: _favoriteNumber,
            name: _name
        });
        peopleArray.push(newPeople); // to store new people into the array

        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
