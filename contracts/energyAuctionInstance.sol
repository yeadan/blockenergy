pragma solidity ^0.6.1;

pragma experimental ABIEncoderV2;

contract Creating{

	struct Auction {
		address payable seller; //seller
		uint id;                //id
		int price;				//price
		uint amount;            //amount
		bool done;              //selled?
		address payable buyer;  //buyer
	}
	mapping (uint => Auction) auctions;
    uint auctionseq;

    function createAuction (uint _id, int _price, uint _amount ) public {
        require(_price > 0,"El precio debe ser positivo");
        require(_amount > 0,"La cantidad debe ser positiva");
        auctions[auctionseq] = Auction(msg.sender, _id, _price, _amount, false, address(0));
        auctionseq++;


    }
    function doneAuction (uint _index) public {
       // require(auctions[_index].done == false,"Ya esta vendida");
       //añadir condiciones si rula bien el gas
        auctions[_index].done = true;
        auctions[_index].buyer = msg.sender;
    }

    function returnAllAuctions() public view returns(Auction[] memory){
    Auction[] memory ret = new Auction[](auctionseq);
        for (uint i = 0; i < auctionseq; i++) {
            ret[i] = auctions[i];
        }
        return ret;
    }

    function deleteAuction(uint _index) public {
        require(_index <= auctionseq, "No existe el elemento");
        auctionseq--;
        auctions[_index] = auctions[auctionseq];

    }
}