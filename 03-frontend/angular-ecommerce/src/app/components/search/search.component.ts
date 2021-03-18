import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private searchBarService: SearchBarService) { }

  ngOnInit(): void {
  }

  doSearch(value: String) {
    this.router.navigateByUrl(`/search/${value}`);
  }
}