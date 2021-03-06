﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Note_taker.Models
{
    public class AuthenticationModel
    {
        [MinLength(6)]
        [Required]
        public string Username { get; set; }

        [MinLength(6)]
        [Required]
        public string Password { get; set; }
    }
}
