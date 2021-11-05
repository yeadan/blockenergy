pragma solidity ^0.6.1;

pragma experimental ABIEncoderV2;

contract Creating{

	struct Auction {
		address payable seller; //seller
		uint id;                //id
		uint price;				//price
		uint amount;            //amount
		uint totalGWEI;         //Total - GWEI in that momment
		bool done;              //selled?
		address payable buyer;  //buyer
	}
	mapping (uint => Auction) auctions;
    uint auctionseq;

    function createAuction (uint _id, uint _price, uint _amount) public {
        require(_price > 0,"El precio debe ser positivo");
        require(_amount >= 100,"La cantidad debe ser al menos de 100 w");
        
        auctions[auctionseq] = Auction(msg.sender, _id, _price, _amount, 0, false, address(0));
        auctionseq++;

    }
    function doneAuction (uint _index, uint _GWEI ) public {
        require(auctions[_index].done == false,"Ya esta vendida");
        require(_index < auctionseq, "No existe el elemento");
        require(_GWEI > 0, "GWEI tiene que ser mayor que 0");
        require(auctions[_index].seller != msg.sender, "No se puede comprar su propia energia");
        
        auctions[_index].done = true;
        auctions[_index].buyer = msg.sender;
        auctions[_index].totalGWEI = _GWEI;
    }

    function returnAllAuctions() public view returns(Auction[] memory){
    Auction[] memory ret = new Auction[](auctionseq);
        for (uint i = 0; i < auctionseq; i++) {
            ret[i] = auctions[i];
        }
        return ret;
    }
    
    function deleteAuction(uint _index) public {
        require(_index < auctionseq, "No existe el elemento");
        require(!auctions[_index].done, "No puedes borrar ventas ya realizadas");
        require(auctions[_index].seller == msg.sender, "Solo puedes borrar tus ofertas");
        auctionseq--;
        auctions[_index] = auctions[auctionseq];
        
    }
}