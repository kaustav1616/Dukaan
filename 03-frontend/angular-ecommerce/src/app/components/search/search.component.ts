import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { SearchBarService } from 'src/app/services/search-bar.service';
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

<<<<<<< HEAD
  constructor(private router: Router, private searchBarService: SearchBarService) { }
=======
  constructor(private router: Router) { }
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d

  ngOnInit(): void {
  }

  doSearch(value: String) {
    this.router.navigateByUrl(`/search/${value}`);
  }
}