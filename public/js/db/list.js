getAjax("/api/tables/list", function(data) {
   var response = JSON.parse(data);
   response.tables.forEach(function(table) {
      var li = document.createElement("li");
      var a = document.createElement('a');
      a.href="#";
      a.className="js-table";
      a.dataset.table = table;
      a.onclick = function() {
         var tablename = this.dataset.table;
         getAjax("/api/tables/show/"+tablename, function(data) {
            data = JSON.parse(data);
            var table = document.getElementById("table");
            table.innerHTML = '<tr id="table-header"></tr>';
            // header
            console.log(data.header);
            var tableheader = document.getElementById("table-header");
            tableheader.innerHTML = '<td>remove</td><td>edit</td>';
            for(i=0;i<data.header.length;i++) {
               var td = document.createElement("td");
               var text = document.createTextNode(data.header[i]);
               td.appendChild(text);
               tableheader.appendChild(td);
            };
            // data
            console.log(data.data);
            for(i=0;i<data.data.length;i++) {
               var tr = document.createElement("tr");
               var td = document.createElement("td");
               var a = document.createElement("a");
               a.href="#";
               a.className="js-table";
               a.dataset.id = data.data[i]['id'];
               a.onclick = function() {
                  this.parentNode.parentNode.remove();
                  getAjax("/api/remove/"+tablename+"/"+this.dataset.id, function(data){
                     console.log(data);
                  });
               };
               var text = document.createTextNode("r");
               a.appendChild(text);
               td.appendChild(a);
               tr.appendChild(td);
               td = document.createElement("td");
               a = document.createElement("a");
               a.href="#";
               a.className="js-table";
               a.dataset.id = data.data[i]['id'];
               a.onclick = function() {
                  var check = this.parentNode.parentNode.childNodes;
                  getAjax("/api/update/"+tablename+"/"+this.dataset.id, function(data){
                     console.log(data);
                     if(data == 'ok') {
                        for(k=0;k<check.length;k++) {
                           if(check[k].dataset.name == "first_name" || check[k].dataset.name == "last_name") {
                              check[k].innerHTML = "REDACTED";
                           }
                           if(check[k].dataset.name == "cost") {
                              check[k].innerHTML = "0";
                           }
                        }
                     }
                  });
               };
               text = document.createTextNode("e");
               a.appendChild(text);
               td.appendChild(a);
               tr.appendChild(td);

               for(j=0;j<data.header.length;j++) {
                  var td = document.createElement("td");
                  var text = document.createTextNode(data.data[i][data.header[j]]);
                  td.appendChild(text);
                  td.dataset.name = data.header[j];
                  tr.appendChild(td);
               };

               table.appendChild(tr);
            };
         });
      };
      var atext = document.createTextNode(table);
      a.appendChild(atext);
      li.appendChild(a);
      document.getElementById("tablesList").appendChild(li);
   });
});
