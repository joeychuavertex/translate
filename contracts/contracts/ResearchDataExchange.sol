// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ResearchDataExchange is AccessControl, Pausable {
    using Counters for Counters.Counter;
    
    bytes32 public constant RESEARCHER_ROLE = keccak256("RESEARCHER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    struct DataContribution {
        address contributor;
        string ipfsHash;
        string dataType; // e.g., "patient_record", "molecular_data", "population_data"
        uint256 timestamp;
        bool isPublic;
        string[] tags;
    }
    
    struct DigitalTwin {
        address owner;
        string[] dataHashes;
        uint256 creationTimestamp;
        bool isActive;
    }
    
    Counters.Counter private _contributionIds;
    Counters.Counter private _digitalTwinIds;
    
    mapping(uint256 => DataContribution) public contributions;
    mapping(uint256 => DigitalTwin) public digitalTwins;
    mapping(address => uint256[]) public researcherContributions;
    mapping(address => uint256[]) public researcherDigitalTwins;
    mapping(string => uint256[]) public tagToContributions;
    
    event DataContributed(uint256 indexed contributionId, address indexed contributor, string ipfsHash);
    event DigitalTwinCreated(uint256 indexed twinId, address indexed owner);
    event AccessGranted(address indexed researcher, uint256 indexed contributionId);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    function contributeData(
        string memory ipfsHash,
        string memory dataType,
        bool isPublic,
        string[] memory tags
    ) public whenNotPaused {
        require(hasRole(RESEARCHER_ROLE, msg.sender), "Caller is not a researcher");
        
        _contributionIds.increment();
        uint256 contributionId = _contributionIds.current();
        
        contributions[contributionId] = DataContribution({
            contributor: msg.sender,
            ipfsHash: ipfsHash,
            dataType: dataType,
            timestamp: block.timestamp,
            isPublic: isPublic,
            tags: tags
        });
        
        researcherContributions[msg.sender].push(contributionId);
        
        for (uint i = 0; i < tags.length; i++) {
            tagToContributions[tags[i]].push(contributionId);
        }
        
        emit DataContributed(contributionId, msg.sender, ipfsHash);
    }
    
    function createDigitalTwin(string[] memory dataHashes) public whenNotPaused {
        require(hasRole(RESEARCHER_ROLE, msg.sender), "Caller is not a researcher");
        
        _digitalTwinIds.increment();
        uint256 twinId = _digitalTwinIds.current();
        
        digitalTwins[twinId] = DigitalTwin({
            owner: msg.sender,
            dataHashes: dataHashes,
            creationTimestamp: block.timestamp,
            isActive: true
        });
        
        researcherDigitalTwins[msg.sender].push(twinId);
        
        emit DigitalTwinCreated(twinId, msg.sender);
    }
    
    function grantAccess(uint256 contributionId, address researcher) public {
        require(
            contributions[contributionId].contributor == msg.sender || 
            hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized to grant access"
        );
        require(hasRole(RESEARCHER_ROLE, researcher), "Recipient is not a researcher");
        
        emit AccessGranted(researcher, contributionId);
    }
    
    function getContributionsByTag(string memory tag) public view returns (uint256[] memory) {
        return tagToContributions[tag];
    }
    
    function getResearcherContributions(address researcher) public view returns (uint256[] memory) {
        return researcherContributions[researcher];
    }
    
    function getResearcherDigitalTwins(address researcher) public view returns (uint256[] memory) {
        return researcherDigitalTwins[researcher];
    }
    
    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }
} 