using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudAPI.Models
{
    [Table("Product")]
    public class Product
    {
        [Column("Id")]
        public int Id { get; set; }
        [Column("Description")]
        public string Description { get; set; }
    }
}
