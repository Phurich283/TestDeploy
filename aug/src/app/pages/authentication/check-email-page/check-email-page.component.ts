import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import RouteService from "../../../services/global-services/routeService";

@Component({
  selector: 'app-check-email-page',
  templateUrl: './check-email-page.component.html',
  styleUrls: ['./check-email-page.component.scss'],
})
export class CheckEmailPageComponent implements OnInit{

  refEmail: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly routeService: RouteService
  ) {}

  ngOnInit(): void {
    let refEmail = this.route.snapshot.queryParams['ref_email']
    if (!refEmail)
    {
      console.error("err : no ref_mail")
      this.routeService.toLogin().then()
    } else {
      this.refEmail = refEmail
    }
  }

  backToLogin()
  {
    this.routeService.toLogin().then()
  }

}
