// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

interface INameWrapper {
	function setSubnodeRecord(
		bytes32 parentNode,
		string memory label,
		address owner,
		address resolver,
		uint64 ttl,
		uint32 fuses,
		uint64 expiry
	) external returns (bytes32);
}

interface IPublicResolver {
	function setText(
		bytes32 node,
		string calldata key,
		string calldata value
	) external;
}

contract ENSCaller is ERC1155Holder {
	address public immutable owner;
	bytes32 public ensParentNode;
	address public ensOwner;
	address public ensResolver;

	address nameWrapperDeployment = 0x114D4603199df73e7D157787f8778E21fCd13066;
	INameWrapper nameWrapperContract = INameWrapper(nameWrapperDeployment);

	address publicResolverDeployment =
		0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750;
	IPublicResolver publicResolverContract =
		IPublicResolver(publicResolverDeployment);

	constructor(address _owner) {
		owner = _owner;
	}

	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function setENSData(
		bytes32 _parentNode,
		address _owner,
		address _resolver
	) public isOwner {
		ensParentNode = _parentNode;
		ensOwner = _owner;
		ensResolver = _resolver;
	}

	function provisionSubdomain(string memory _label) public {
		nameWrapperContract.setSubnodeRecord(
			ensParentNode,
			_label,
			ensOwner,
			ensResolver,
			0,
			0,
			0
		);
	}

	function setRecords(
		bytes32 _parentNode,
		string memory _rid,
		string memory _sig
	) public {
		publicResolverContract.setText(_parentNode, "rid", _rid);
		publicResolverContract.setText(_parentNode, "sig", _sig);
	}
}
